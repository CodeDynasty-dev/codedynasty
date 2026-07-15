export default function (params) {
  const tags = params?.tags?.split(",");
  return `<div style="display: flex; flex-wrap: wrap; gap: var(--spacing-8); margin-bottom: var(--spacing-16);">
            ${tags.map(
              (tag) => `<a
                  href="#"
                  class="btn-pill-toggle"
                  style="font-size: var(--text-caption); padding: 4px 12px; color: var(--color-whiteout); background-color: oklch(0% 0 0 / 0.1);"
                >
                  #${tag.trim()}
                </a>`
            ).join("")}
            </div>`;
}
