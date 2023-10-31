import Image from "next/image";
import { AuthContent, Footer } from "./_components";

export default function Index() {
  return (
    <div className="flex h-full flex-col items-center">
      <main className=" flex h-full w-[568px] max-w-full flex-wrap bg-background p-8 text-accent-foreground lg:h-auto lg:w-screen lg:flex-nowrap">
        <div className="flex h-screen max-h-14 w-full items-center justify-start  lg:max-h-full lg:justify-center">
          <div className="relative h-full w-8 lg:h-1/2 lg:w-full">
            <Image src="/x-icon.svg" alt="x-icon" fill />
          </div>
        </div>
        <div className="flex w-full min-w-[356px] flex-col lg:justify-center">
          <AuthContent/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
