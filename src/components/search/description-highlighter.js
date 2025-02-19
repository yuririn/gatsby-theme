import React from "react";

const DescriptionHighlighter = (props) => {
    const { description, searchTerm } = props;

    if (!searchTerm) {
        return <span>{description.substring(0, 50)}{description.length > 50 ? '...' : ''}</span>;
    }

    const lowerCaseDescription = description.toLowerCase();
    const lowerCaseSearchTerms = searchTerm.toLowerCase().split(" ");
    let segments = [];

    lowerCaseSearchTerms.forEach((term) => {
        let startIndex = lowerCaseDescription.indexOf(term);

        while (startIndex !== -1) {
            const contextStart = Math.max(startIndex - 10, 0);
            const contextEnd = Math.min(startIndex + term.length + 10, description.length);
            const preText = description.substring(contextStart, startIndex);
            const highlightedText = description.substring(
                startIndex,
                startIndex + term.length
            );
            const postText = description.substring(
                startIndex + term.length,
                contextEnd
            );

            segments.push({
                preText,
                highlightedText,
                postText,
                contextStart,
                contextEnd,
            });

            startIndex = lowerCaseDescription.indexOf(
                term,
                startIndex + term.length
            );
        }
    });

    if (segments.length === 0) {
        return <span>{description.substring(0, 50)}{description.length > 50 ? '...' : ''}</span>;
    }

    // 次のターゲットまで10文字以内の場合の処理
    segments = segments.reduce((acc, current, index, array) => {
        if (
            index > 0 &&
            current.contextStart - array[index - 1].contextEnd <= 10
        ) {
            acc[acc.length - 1].postText +=
                array[index - 1].highlightedText +
                array[index - 1].postText +
                current.preText;
            acc[acc.length - 1].highlightedText = current.highlightedText;
            acc[acc.length - 1].contextEnd = current.contextEnd;
        } else {
            acc.push(current);
        }
        return acc;
    }, []);

    // 1個または2個の場合のトリム処理
    if (segments.length === 1) {
        segments[0].preText = description.substring(
            Math.max(segments[0].contextStart - 30, 0),
            segments[0].contextStart
        );
        segments[0].postText = description.substring(
            segments[0].contextEnd,
            Math.min(segments[0].contextEnd + 30, description.length)
        );
    } else if (segments.length === 2) {
        segments[0].preText = description.substring(
            Math.max(segments[0].contextStart - 10, 0),
            segments[0].contextStart
        );
        segments[0].postText = description.substring(
            segments[0].contextEnd,
            Math.min(segments[0].contextEnd + 10, description.length)
        );
        segments[1].preText = description.substring(
            Math.max(segments[1].contextStart - 10, 0),
            segments[1].contextStart
        );
        segments[1].postText = description.substring(
            segments[1].contextEnd,
            Math.min(segments[1].contextEnd + 10, description.length)
        );
    }

    const finalTextSegments = segments.slice(0, 2).map((segment, index) => {
        const prefix = segment.contextStart > 0 && index === 0 ? "..." : "";
        const suffix = segment.contextEnd < description.length ? "..." : "";
        return `${prefix}${segment.preText}<mark style="color: var(--accent-color)">${segment.highlightedText}</mark>${segment.postText}${suffix}`;
    });

    const finalText = finalTextSegments.join("...");

    return (
        <p
            dangerouslySetInnerHTML={{ __html: finalText }}
            className="c-search__item__description"
        />
    );
};

export default DescriptionHighlighter;
