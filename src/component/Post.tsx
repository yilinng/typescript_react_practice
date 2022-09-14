const Post = ({ className, ...props }: JSX.IntrinsicElements["span"]) => (
  <span className={`${className ?? ""}`} {...props} />
);

export default Post;