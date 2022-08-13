# ☁️⚡ Serverless Notion Blog

Powering my blog at [https://arthtyagi.xyz/blog](https://arthtyagi.xyz/blog). The data is from my Notion.

## Why

I have been using Notion for a while now to host my blog, however, I don't like the design of the blog. I wanted to make it more "me" (read: broken but sexy).

I'm not big on open-source anymore but this still seemed cool to make open-source since it's just a stupid blog.

## Features

- [X] Performant ⚡ . Does not re-fetch blogs unless there's a change.
- [X] Rendering list of all blogs.
- [X] Rendering titles.
- [X] Rendering content (essentially, title arrays w text property).
- [X] Rendering images (sort of. dimensions are icky).
- [X] Rendering Lists.

![image](https://user-images.githubusercontent.com/41021374/182890950-1cf81d5c-0790-4d9a-8096-56b5e33a9bb2.png)

--

![image2](https://user-images.githubusercontent.com/41021374/182893665-aa7ad51b-6816-4e47-99ac-fd31080a647c.png)

## How

Okay, so, to use Notion API and render content, you need to have a server. Since this is just a front-end, I chose to deploy my own serverless function on Cloudflare workers and consume it instead.

1. I used [Splitbee's open-source Notion API worker](https://github.com/splitbee/notion-api-worker/) to consume the Notion API.
2. I used [Cloudflare Workers](https://cloudflareworkers.com/) to deploy the worker.
3. Dig into the source code to see how I made it work.

This was the easy part. The shitty part was how Notion's API works in the first place. The content is A MESS. I had to use a lot of hacks to get it to work.

From Notion's standpoint though, this is pretty neat. The way they have everything in blocks. I mean, that's how the whole thing functions.

### To-do

Look at issues.

### Config

- `NOTION_URL`: The url of your worker.
- `NOTION_BASE`: where your blog is hosted.
