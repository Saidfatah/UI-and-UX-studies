import { notFound } from "next/navigation";

const products = [
    {
        id: "azaz"
    }
]

async function  NotFOundIdPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) return notFound()

    const product = products.filter(p => p.id === id)

    if (!product.length) return notFound()

    return (<div>
        id: {id}
    </div>);
}

export default NotFOundIdPage;