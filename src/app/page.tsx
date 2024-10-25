import SavedSnips from "@/components/savedSnips";

export default function Home() {
  return (
    <div className="p-2">
      <div className="mb-4">
        <h1 className="text-2xl pb-1">
          Easy to share. Authenticate and start sharing
        </h1>
        <p className="opacity-70">
          Sharing your code snippet has never been easier. Specify your language
          and share the code.
        </p>
      </div>
      <SavedSnips />
    </div>
  );
}
