// "use client";

export default function Iframe() {
  const src = process.env.NEXT_PUBLIC_SDK_URL || "";

  return (
    <div className="w-screen h-screen p-8 absolute">
      <iframe
        className="w-full h-full border border-gray-700 bg-background"
        aria-label="SDK App"
        title="SDK App"
        src={`${src}`}
      ></iframe>
    </div>
  );
}
