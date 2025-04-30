const TwitterIcon = ({ width = 25, height = 25, color = 'currentColor', style = {} }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color, ...style }}
  >
    <path
      d="M8.85063 7.09296L13.7606 1.12769H11.965L8.02436 5.91625L4.62393 1.12769H0.333679L5.9269 8.90705L0.667366 15.2972H2.46292L6.75317 10.0674L10.5032 15.2972H14.6822L8.85063 7.09296ZM2.24046 2.10828H4.13135L12.7436 14.2349H10.9481L2.24046 2.10828Z"
      fill="currentColor"
    />
  </svg>
);

export default TwitterIcon;
