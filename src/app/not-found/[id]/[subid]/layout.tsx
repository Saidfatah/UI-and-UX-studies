async function LayoutSub({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string, subid: string }>;
}) {
    const { id, subid } = await params;

    return (<div>
        <h1>Product {id} {subid}</h1>
        {children}
    </div>
    );
}

export default LayoutSub;