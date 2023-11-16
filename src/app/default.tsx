import Index from "./(index)/page";

export default function DefaultPage({ flow }: { flow: React.ReactNode }) {
  return (
    <>
      <Index />
      {flow}
    </>
  );
}
