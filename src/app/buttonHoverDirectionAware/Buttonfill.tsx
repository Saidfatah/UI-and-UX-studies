const Button = ({ as, children, filled, secondary, ...rest }: any) => {
    const that = {
        as
    }
    return (
        <div className={`dir-control ${secondary ? 'dir-control--secondary' : ''} ${filled ? 'dir-control--filled' : ''}`} {...rest} >
            {children}
            <span />
            <span />
            <span />
            <span />
            <b aria-hidden="true">{children}</b>
            <b aria-hidden="true">{children}</b>
            <b aria-hidden="true">{children}</b>
            <b aria-hidden="true">{children}</b>
        </div>
    )
}


function ButtonFilHover() {
    return (<>
        <Button role="button" >Click Me!</Button>
        <Button as="a" href="#" >Link Me!</Button>
        <Button role="button" secondary >Click Me!</Button>
        <Button as="a" href="#" secondary >Link Me!</Button>
        <Button role="button" filled >Click Me!</Button>
        <Button as="a" href="#" filled >Link Me!</Button>
    </>);
}

export default ButtonFilHover;