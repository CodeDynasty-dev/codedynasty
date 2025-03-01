export const createArticleCard = (article) => `
    <article class="bg-white/5 rounded-lg overflow-hidden card-hover">
        <a href="${article.link}" class="block group">
            <div class="aspect-video overflow-hidden">
                <img src="${article.image}" 
                     alt="${article.title}"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            </div>
            <div class="p-6">
                <span class="text-pink-500 text-sm">${article.category}</span>
                <h3 class="text-2xl font-bold my-4 group-hover:text-pink-500 transition-colors">${article.title}</h3>
                <p class="text-gray-400 mb-4">${article.summary}</p>
                <div class="flex items-center text-sm text-gray-500">
                    <span>By ${article.author}</span>
                    <span class="mx-2">•</span>
                    <time datetime="${article.date}">${article.formattedDate}</time>
                </div>
            </div>
        </a>
    </article>
`;
