const minWidth = (width: number) => `(min-width: ${width}px)`;

const media = {
  sm: minWidth(640),
  md: minWidth(768),
  lg: minWidth(1024),
  xl: minWidth(1280),
};

export default media;
