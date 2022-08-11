const NOTION_BASE = import.meta.env.VITE_NOTION_BASE;
// VITE_BASE_URL should be your public Notion url

export function genURL(item: unknown) {
  let title = item.value.properties.title[0][0];
  // strip ;,:,/""'? from title, replace with -
  title = title.replace(/[;,:,/"'?]/g, '-');
  let slugId = item.value.id;
  // remove hyphens from slugId
  slugId = slugId.replace(/-/g, '');
  return `${NOTION_BASE}${title}-${slugId}`;
}

function genImgURL(item) {
  let url = item.value.properties.source[0][0];
  const blockId = item.value.id;
  const spaceId = item.value.space_id;
  url = ((url.replace(/:/g, '%3A')).replace(/\//g, '%2F'));
  const secureTrail = `?table=block&id=${blockId}&spaceId=${spaceId}`;
  url = `${NOTION_BASE}/image/${url}${secureTrail}`;
  return url;
}

function getTitle(item) {
  // console.log(item.value.properties.title[0][0]);
  return item.value.properties.title[0][0];
}

export function dataProcessor(data) {
  const notion = [];
  const dataMap = new Map(Object.entries(data));
  const dataList = Array.from(dataMap.values());
  const pageTitle = getTitle(dataList[0]);
  notion.push({
    content: pageTitle,
    type: 'title',
    key: 'title',
  });
  for (const item of dataList) {
    try {
      if (item.value.type === 'text') {
        if (item.value.properties.title.length > 0) {
          const text = item.value.properties.title.reduce(
            (acc, cur) => acc + cur[0],
            '',
          );
          notion.push({
            content: text,
            type: 'text',
            key: item.value.id,
          });
        } else {
          for (const title of item.value.properties.title) {
            notion.push({
              content: title[0],
              type: 'text',
              key: item.value.id,
            });
          }
        }
      }
      if (item.value.type === 'image') {
        notion.push({
          content: genImgURL(item),
          type: 'image',
          key: item.value.id,
        });
      }
      if (item.value.type === 'bulleted_list') {
        notion.push({
          content: item.value.properties.title[0][0],
          type: 'bulleted-list',
          key: item.value.id,
        });
      }
    } catch (err) {
      notion.push({
        content: '',
        key: item.value.id,
      });
    }
  }
  return notion;
}
