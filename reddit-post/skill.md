---
name: reddit-post
description: Browse Reddit communities, read posts, and post comments on behalf of the user via OpenCLI
version: 0.1.0
---

# Reddit Post Skill

Post comments on Reddit communities on behalf of the user, powered by OpenCLI.

## Prerequisites

- OpenCLI installed (`npm install -g @jackwener/opencli`)
- Chrome running with Reddit logged in
- OpenCLI Browser Bridge extension active

## Workflow

### Step 1: Browse a subreddit

```bash
opencli reddit subreddit <subreddit-name> --limit 10 -f json
```

Example:
```bash
opencli reddit subreddit books --limit 10 -f json
```

Output includes: `title`, `author`, `upvotes`, `comments`, `url`

### Step 2: Read a post and its comments

```bash
opencli reddit read "<post-url>" --limit 10 --depth 1 -f json
```

- `post-url`: Full Reddit post URL, or post ID (e.g. `1sqobaj`)
- `--limit`: Number of top-level comments (default 25)
- `--depth`: Reply depth (1=no replies, 2=one level, etc.)
- `--sort`: Comment sort order (`best`, `top`, `new`, `controversial`, `old`, `qa`)

Example:
```bash
opencli reddit read "https://www.reddit.com/r/books/comments/1sqobaj/the_financial_reality_of_book_publishing_no_one/" --limit 10 --depth 1 -f json
```

### Step 3: Post a comment

```bash
opencli reddit comment "<post-id>" "<comment-text>"
```

- `post-id`: Short ID from URL (e.g. `1sqobaj`) or fullname (`t3_xxx`)
- `comment-text`: The reply text

Example:
```bash
opencli reddit comment "1sqobaj" "Great point about author transparency."
```

Success output: `status: success, message: Comment posted on t3_xxx`

## Other Useful Commands

| Command | Description |
|---------|-------------|
| `opencli reddit hot` | Hot posts from front page |
| `opencli reddit frontpage` | Front page posts |
| `opencli reddit popular` | Popular posts |
| `opencli reddit search <query>` | Search Reddit |
| `opencli reddit user <username>` | View user profile |
| `opencli reddit user-posts <username>` | User's posts |
| `opencli reddit upvote <post-id>` | Upvote a post |
| `opencli reddit save <post-id>` | Save a post |
| `opencli reddit subscribe <subreddit>` | Subscribe to subreddit |

## Guidelines

- Always **read the post and comments first** before drafting a reply — understand the context
- Draft the reply and **show it to the user for confirmation** before posting — this is a public, hard-to-reverse action
- Keep replies **concise and relevant** to the discussion
- Respect subreddit rules and Reddit etiquette
- If a command fails, try with `OPENCLI_DIAGNOSTIC=1` for debug info
