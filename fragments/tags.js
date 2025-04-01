export default function (params) {
  const tags = params?.tags?.split(",");
  return `<div class="flex mb-4 flex-wrap gap-2">
            ${tags.map(
              (tag) => `<a
                  href="#"
                  class="px-3 py-1 rounded-full text-sm hover:bg-primary-color hover:text-black transition-colors"
                  style="
                    background-color: rgba(0, 255, 170, 0.1);
                    color: var(--primary-color);
                  "
                >
                  #${tag.trim()}
                </a>`
            )}
            </div>`;
}
