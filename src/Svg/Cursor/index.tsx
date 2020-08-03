import * as React from 'react'

export const Cursor = ({ colors, theme, width = 222, height = 221, strokeWidth = 1, svgKey = '' }: any) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 222 221"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M153.329 129.561C141.154 107.623 124.967 82.3484 106.893 64.2747C67.8407 25.2223 34.7682 34.5762 34.7682 34.5762C34.7682 34.5762 25.4143 67.6487 64.4667 106.701C82.5404 124.775 107.815 140.962 129.753 153.137L153.329 129.561Z"
                stroke={`black`}
                strokeWidth={strokeWidth}
                fill={colors[theme].primaryColor} />
            <path
                d="M109.368 71.6993C98.2117 91.0339 89.9128 99.6088 71.5378 110.944"
                stroke={`black`}
                strokeWidth={strokeWidth}
                fill={colors[theme].backgroundColor} />
            <path
                d="M103.004 63.9212C92.779 82.6631 84.9794 91.6976 64.8202 103.519"
                stroke={`black`}
                strokeWidth={strokeWidth}
                fill={colors[theme].backgroundColor} />
            <path
                d="M39.718 64.9818C51.1669 56.3668 56.5646 50.628 64.8203 39.1724"
                strokeWidth={strokeWidth}
                fill={colors[theme].backgroundColor} />
            <circle
                cx="69.4164"
                cy="69.9316"
                r="10"
                transform="rotate(-45 69.4164 69.9316)"
                stroke={`black`}
                strokeWidth={strokeWidth}
                fill={colors[theme].backgroundColor} />
            <path
                d="M98.0543 131.096L93.4581 161.148L130.228 175.998L133.41 166.452L116.439 157.966L118.914 144.178"
                stroke={`black`}
                strokeWidth={strokeWidth}
                fill={colors[theme].primaryColor} />
            <path
                d="M131.288 97.8623L161.34 93.2661L176.19 130.036L166.644 133.218L158.158 116.247L144.37 118.722"
                stroke={`black`}
                strokeWidth={strokeWidth}
                fill={colors[theme].primaryColor} />
            <path
                d="M163.108 143.117L145.784 160.441C151.884 173.109 158.766 176.38 174.422 178.472L172.3 169.987C172.3 169.987 198.463 178.472 197.049 177.058C195.635 175.644 181.232 151.502 163.108 143.117Z"
                stroke={`black`}
                strokeWidth={strokeWidth}
                fill={colors[theme].dangerColor} />
        </svg>
    )
}