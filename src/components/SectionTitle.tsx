interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <div className="mx-auto mb-5 h-px w-16 bg-[#d4af37]" />

      {subtitle && (
        <p className="font-kz-1 mb-3 text-4xl text-[#d4af37]">
          {subtitle}
        </p>
      )}

      <h2 className="font-cormorant text-5xl font-light text-[#1f1f1f]">
        {title}
      </h2>
    </div>
  );
}