import React from "react";

const DescriptionHighlighter = props => {
    const { description, searchTerm } = props;

    if (!searchTerm) {
        return <span>{description.substring(0, 50)}{description.length > 50 ? '...' : ''}</span>;
    }

    const lowerCaseDescription = description.toLowerCase();
    const lowerCaseSearchTerms = searchTerm.toLowerCase().split(" ");
    let segments = [];

    lowerCaseSearchTerms.forEach(term => {
        let startIndex = lowerCaseDescription.indexOf(term);

        while (startIndex !== -1) {
            const contextStart = Math.max(startIndex - 10, 0);
            const contextEnd = Math.min(startIndex + term.length + 10, description.length);
            const preText = description.substring(contextStart, startIndex);
            const highlightedText = description.substring(startIndex, startIndex + term.length);
            const postText = description.substring(startIndex + term.length, contextEnd);

            segments.push({
                preText,
                highlightedText,
                postText,
                contextStart,
                contextEnd
            });

            startIndex = lowerCaseDescription.indexOf(term, startIndex + term.length);
        }
    });

    if (segments.length === 0) {
        return <span>{description.substring(0, 50)}{description.length > 50 ? '...' : ''}</span>;
    }

    const finalTextSegments = segments.slice(0, 2).map((segment, index) => {
        const prefix = segment.contextStart > 0 && index === 0 ? '...' : '';
        const suffix = segment.contextEnd < description.length ? '...' : '';
        return `${prefix}${segment.preText}<mark style="color: var(--accent-color)">${segment.highlightedText}</mark>${segment.postText}${suffix}`;
    });

    const finalText = finalTextSegments.join('...');

    return <span dangerouslySetInnerHTML={{ __html: finalText }} />;
};

export default DescriptionHighlighter;
