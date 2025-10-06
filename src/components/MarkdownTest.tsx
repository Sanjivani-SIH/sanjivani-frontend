import React from 'react';
import ReactMarkdown from 'react-markdown';

const testMarkdown = `
# Sanjivani AI Assistant

**Welcome to Sanjivani!** I can help you with:

## Forest Rights Act (FRA)
- **Application process** and requirements
- **Required documents** and procedures
- **Legal framework** and guidelines

## Government Schemes
1. **Forest Rights Act** implementation schemes
2. **Tribal welfare** programs
3. **Community development** initiatives

### Example Code
\`\`\`javascript
const example = "This is how code will appear";
console.log(example);
\`\`\`

### Links and Resources
- [Official FRA Guidelines](https://tribal.nic.in)
- [Contact Support](mailto:support@sanjivani.gov.in)

> **Note:** I'm here to provide information and guidance, not legal advice.
`;

export const MarkdownTest: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Markdown Rendering Test
      </h2>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-sm font-semibold mb-2">{children}</h3>,
            code: ({ children }) => (
              <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs overflow-x-auto mb-2">
                {children}
              </pre>
            ),
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            a: ({ children, href }) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 my-2 italic">
                {children}
              </blockquote>
            ),
          }}
        >
          {testMarkdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownTest;