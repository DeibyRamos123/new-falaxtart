import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function CommentsToggle({
    expanded,
    onToggle
}) {

    return (
        <button
            onClick={onToggle}
            className="publication-user-comments__view-more"
        >
            {expanded
                ? 'Close comments'
                : 'Open comments'
            }

            <FontAwesomeIcon
                icon={faChevronDown}
                style={{
                    marginLeft: 6,
                    transform: expanded
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                }}
            />
        </button>
    );
}