import ClientButton from "../../ClientButton";

async function NotFOundIdPage({ params }: { params: Promise<{ id: string, subid: string }> }) {
    const { id, subid } = await params;

    return (<div>
        this children
        <ClientButton />
    </div>);
}

export default NotFOundIdPage;