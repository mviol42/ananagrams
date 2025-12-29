---
description: Use Context7 to get up-to-date documentation for libraries and frameworks
allowed-tools: mcp__context7-mcp__resolve-library-id, mcp__context7-mcp__get-library-docs
---

# Context7 Documentation Lookup

Use Context7 MCP server to fetch up-to-date documentation for libraries and frameworks used in this project.

## Available Libraries

This project uses:
- React 18.2.0
- TypeScript 4.9.5
- @dnd-kit/core 6.0.8
- @testing-library/react 13.4.0
- Bootstrap 5.3.1
- Jest (via react-scripts)

## Instructions

1. Use `resolve-library-id` to find the correct library identifier
2. Use `get-library-docs` to fetch the documentation with a specific topic focus

## Example Usage

To get React documentation about hooks:
1. Resolve: "react"
2. Get docs with topic: "hooks"

To get testing-library documentation:
1. Resolve: "@testing-library/react"
2. Get docs with topic: "queries" or "user-event"
