const NOTION_BASE = import.meta.env.VITE_NOTION_BASE;
// VITE_BASE_URL should be your public Notion url

export interface NotionItem {
  content: string;
  type: string;
  key: string;
}

export interface NotionResponse {
  data: { data: {} };
}

export function genURL(item: any) {
  let title = item.value.properties.title[0][0];
  // strip ;,:,/""'? from title, replace with -
  title = title.replace(/[;,:,/"'?]/g, '-');
  let slugId = item.value.id;
  // remove hyphens from slugId
  slugId = slugId.replace(/-/g, '');
  return `${NOTION_BASE}${title}-${slugId}`;
}
// todo: Item interface; basically the Notion's response
function genImgURL(item: any) {
  let url = item.value.properties.source[0][0];
  const blockId = item.value.id;
  const spaceId = item.value.space_id;
  url = ((url.replace(/:/g, '%3A')).replace(/\//g, '%2F'));
  const secureTrail = `?table=block&id=${blockId}&spaceId=${spaceId}`;
  url = `${NOTION_BASE}/image/${url}${secureTrail}`;
  return url;
}

function getTitle(item: any) {
  // console.log(item.value.properties.title[0][0]);
  return item.value.properties.title[0][0];
}

export function dataParser(data: NotionResponse) {
  const notion: NotionItem[] = [];
  const dataMap = new Map(Object.entries(data));
  const dataList = Array.from(dataMap.values());
  const pageTitle = getTitle(dataList[0]);
  notion.push({
    content: pageTitle,
    type: 'title',
    key: 'title',
  });
  for (const item of dataList as any) {
    console.log(item);
    try {
      if (item.value.type === 'text') {
        const text = item.value.properties.title.reduce(
          (acc: string, cur: string) => acc + cur[0],
          '',
        );
        notion.push({
          content: text,
          type: 'text',
          key: item.value.id,
        });
      }
      if (item.value.type === 'image') {
        notion.push({
          content: genImgURL(item),
          type: 'image',
          key: item.value.id,
        });
      }
      if (item.value.type === 'bulleted_list') {
        const list = item.value.properties.title.reduce(
          (acc: string, cur: string) => acc + cur[0],
          '',
        );
        notion.push({
          content: list,
          type: 'bulleted-list',
          key: item.value.id,
        });
      }
      if (item.value.type === 'quote') {
        const quote = item.value.properties.title.reduce(
          (acc: string, cur: string) => acc + cur[0],
          '',
        );
        notion.push({
          content: quote,
          type: 'quote',
          key: item.value.id,
        });
      }
    } catch (err) {
      notion.push({
        content: '',
        key: item.value.id,
        type: '',
      });
    }
  }
  return notion;
}
