import { FC } from "react";

export type HeaderProps =
    JSX.IntrinsicElements["div"] & {
        // I used "heading" here because
        // "title" is already a prop of "div"
        readonly heading?: string;
  };
/*    
export interface Props extends React.HTMLProps<HTMLDivElement> {
  heading: string;
}

const Header : React.FC<Props> = (props: Props) => {
  return (
    <div>
      <h1>{props.heading}</h1>
      {props.children}
    </div>
  );
};
*/

const Header: FC<HeaderProps> = ({
    children,
    heading,
    className,
    ...props
}) => (
    <div className={ heading } {...props}>
        <h1 className={`heading1 ${className ?? ""}`} {...props}>{heading}</h1>
        {children}
    </div>
);

export default Header;