import * as React from 'react'

export const Cursor = ({ colors, theme, width = 32, height = 32, strokeWidth = 1, svgKey = '' }: any) => {
    return (
        <svg
            key={`cursor-svg-${svgKey}`}
            width={width}
            height={height}
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                strokeWidth={strokeWidth}
                d="M11.3552 21.0193L9.25304 19.628L7.618 17.9275L6.21654 16.3816L4.27007 13.6763L3.10219 11.6667L2.71541 10.8164M11.3552 21.0193L13.0681 22.1787L14.8589 23.4155L16.4939 24.6522L17.8175 25.5797M11.3552 21.0193L10.1095 28.4396L14.8589 33L17.8175 25.5797M17.8175 25.5797L19.4526 26.5845L21.3212 27.8213L22.4112 28.4396L23.0341 28.8261L24.3577 27.5121L25.5255 26.3527L26.6156 25.2705L27.3942 24.343L28.3285 23.4155L29.0292 22.6425L28.0949 21.0193L27.2384 19.8599L26.0706 18.1594L25.5255 17.2705M11.3552 2.23671L12.7567 3.00966L14.4696 4.16908L16.4939 5.79227L17.8175 6.95169L19.219 8.49758L20.9319 10.5072L21.6326 11.5507M11.3552 2.23671L10.2652 1.85024L8.08516 1.38647L5.90511 1H1.15572L1 2.4686L1.15572 4.55556L1.46715 6.71981L2.01217 9.27053L2.71541 10.8164M11.3552 2.23671L2.71541 10.8164M21.6326 11.5507L22.3333 12.5942L23.6569 14.5266L24.9805 16.3816L25.5255 17.2705M21.6326 11.5507L28.6399 10.1208L32.8443 14.372L25.5255 17.2705M25.7591 29.7536L33 32.6908L30.1971 25.2705M10.4209 9.57971L9.87591 10.5072L9.64234 11.8986L9.87591 13.4444L10.4209 14.5266L11.3552 15.686L12.2895 16.3816L13.5353 17.0773L14.8589 17.4638H16.4939L17.1168 17.0773L17.8175 15.686L17.6618 14.5266L17.1168 13.2126L16.4939 11.8986L15.6375 10.8164L14.7032 10.1208L13.691 9.57971L12.4453 9.27053L10.4209 9.57971Z"
                stroke={colors[theme].primaryColor} />
        </svg>
    )
}