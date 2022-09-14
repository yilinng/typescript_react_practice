const Posts = ({ className, ...props }: JSX.IntrinsicElements["div"]) => (
    <div className={`${className ?? ""}`} {...props} />
);

export default Posts;