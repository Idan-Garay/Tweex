import { Dialog, DialogContent } from "@/_components/ui/dialog";

interface OnboardingLayout {
  defaultOpen: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const OnboardingDialog = ({
  defaultOpen = true,
  open,
  onOpenChange,
  children,
  ...props
}: OnboardingLayout) => {
  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="flex h-full w-full max-w-none items-center justify-center overflow-hidden rounded-none sm:max-h-[650px] sm:max-w-[600px] sm:rounded-sm ">
        {children}
      </DialogContent>
    </Dialog>
  );
};
