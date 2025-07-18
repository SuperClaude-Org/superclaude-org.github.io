
/**
 * SuperClaude v3 Website Components
 * Reusable UI components and their functionality
 */

/**
 * Badge Component Generator
 */
class BadgeComponent {
    constructor(config) {
        this.config = config;
    }

    generate() {
        return `
            <a href="${this.config.url}" target="_blank" rel="noopener" class="badge-link">
                <img src="${this.config.src}" alt="${this.config.alt}" class="h-6">
            </a>
        `;
    }
}

/**
 * Feature Card Component
 */
class FeatureCard {
    constructor(title, description, icon, items = []) {
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.items = items;
    }

    render() {
        const itemsHtml = this.items.map(item => `
            <div class="flex justify-between">
                <code>${item.command}</code>
                <span class="text-gray-600">${item.description}</span>
            </div>
        `).join('');

        return `
            <div class="feature-card rounded-2xl p-6">
                <h3 class="text-lg md:text-xl font-bold claude-primary mb-4 flex items-center">
                    <i class="${this.icon} mr-3"></i>
                    ${this.title}
                </h3>
                <div class="space-y-2 text-xs md:text-sm">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }
}

/**
 * Contributor Card Component
 */
class ContributorCard {
    constructor(username, displayName, role, tags = [], isPlaceholder = false) {
        this.username = username;
        this.displayName = displayName;
        this.role = role;
        this.tags = tags;
        this.isPlaceholder = isPlaceholder;
    }

    render() {
        const avatarUrl = this.isPlaceholder ? '' : `https://github.com/${this.username}.png`;
        const profileUrl = this.isPlaceholder ? '#' : `https://github.com/${this.username}`;
        
        const tagsHtml = this.tags.map(tag => `
            <span class="claude-bg-light px-2 py-1 rounded-full">${tag}</span>
        `).join('');

        const avatarContent = this.isPlaceholder ? 
            `<i class="fas fa-users text-2xl md:text-3xl claude-primary"></i>` :
            `<img src="${avatarUrl}" alt="${this.displayName}" class="w-full h-full object-cover">`;

        return `
            <div class="feature-card rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300">
                <a href="${profileUrl}" target="_blank" rel="noopener" class="block">
                    <div class="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-200 group-hover:border-orange-400 transition-colors ${this.isPlaceholder ? 'bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center' : ''}">
                        ${avatarContent}
                    </div>
                    <h3 class="text-lg md:text-xl font-bold claude-primary mb-2">${this.displayName}</h3>
                    <p class="text-xs md:text-sm text-gray-600 mb-2">${this.role}</p>
                    <div class="flex justify-center space-x-2 text-xs">
                        ${tagsHtml}
                    </div>
                </a>
            </div>
        `;
    }
}

/**
 * Code Block Component with Copy Button
 */
class CodeBlock {
    constructor(code, language = 'bash') {
        this.code = code;
        this.language = language;
    }

    render() {
        const escapedCode = this.code.replace(/'/g, "\\'").replace(/\n/g, '\\n');
        
        return `
            <div class="bg-gray-900 text-green-400 rounded-lg p-3 md:p-4 font-mono text-xs md:text-sm overflow-x-auto relative group">
                <button onclick="copyToClipboard('${escapedCode}')" class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs copy-button transition-all duration-300">
                    <i class="fas fa-copy mr-1"></i>Copy
                </button>
                <pre><code class="language-${this.language}">${this.code}</code></pre>
            </div>
        `;
    }
}

/**
 * Installation Step Component
 */
class InstallationStep {
    constructor(stepNumber, title, content, bgColor = 'claude-bg-primary') {
        this.stepNumber = stepNumber;
        this.title = title;
        this.content = content;
        this.bgColor = bgColor;
    }

    render() {
        return `
            <div class="installation-step rounded-2xl p-6 md:p-8">
                <div class="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div class="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 ${this.bgColor} text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto md:mx-0">
                        ${this.stepNumber}
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl md:text-2xl font-bold mb-4 mobile-center">${this.title}</h3>
                        ${this.content}
                    </div>
                </div>
            </div>
        `;
    }
}

/**
 * Navigation Component
 */
class Navigation {
    constructor(items) {
        this.items = items;
    }

    renderDesktop() {
        return this.items.map(item => `
            <a href="${item.href}" class="hover:text-orange-600 transition-colors">${item.label}</a>
        `).join('');
    }

    renderMobile() {
        return this.items.map(item => `
            <a href="${item.href}" class="hover:text-orange-600 transition-colors" onclick="toggleMobileMenu()">${item.label}</a>
        `).join('');
    }
}

// Export components for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BadgeComponent,
        FeatureCard,
        ContributorCard,
        CodeBlock,
        InstallationStep,
        Navigation
    };
}
