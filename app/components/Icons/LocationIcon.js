const LocationIcon = ({ width = 25, height = 25, color = 'white', style = {} }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color, ...style }}
  >
    <path
      d="M7.99999 0C4.00604 0 0.756744 3.2493 0.756744 7.2432C0.756744 12.1998 7.23874 19.4763 7.51471 19.7836C7.77393 20.0723 8.22651 20.0718 8.48526 19.7836C8.76124 19.4763 15.2432 12.1998 15.2432 7.2432C15.2432 3.2493 11.9939 0 7.99999 0ZM7.99999 10.8875C5.99053 10.8875 4.35577 9.25266 4.35577 7.2432C4.35577 5.23375 5.99057 3.59898 7.99999 3.59898C10.0094 3.59898 11.6442 5.23379 11.6442 7.24324C11.6442 9.25269 10.0094 10.8875 7.99999 10.8875Z"
      fill={color}
    />
  </svg>
);

export default LocationIcon;
