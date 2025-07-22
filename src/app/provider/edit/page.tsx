import ProviderAccountForm from '@/components/ProviderAccountForm';

export default function page() {
    return (
        <main className="p-4">
            <ProviderAccountForm
                mode="edit"
                method="PUT"
                //onSubmitUrl={`/api/provider/update?id=${provider.id}`}
                //initialValues={provider}
            />

        </main>
    );
}