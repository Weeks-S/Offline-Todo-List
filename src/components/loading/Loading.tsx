interface LoadingProps {
  loadingText?: string;
}
export default function Loading({ loadingText }: LoadingProps) {
  return (
    <div className="flex items-center justify-center h-full w-full flex-col gap-6">
      <div className="animate-[spin_1s_ease-in-out_infinite] rounded-full h-12 w-12 border-t-2 border-r-2 border-blue-500 border-dashed"></div>
      {loadingText && (
        <p className="text-lg text-blue-400 font-semibold animate-pulse">{loadingText}</p>
      )}
    </div>
  );
}
