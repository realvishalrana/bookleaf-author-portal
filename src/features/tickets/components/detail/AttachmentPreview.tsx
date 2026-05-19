interface Props {
  url: string;
}

export function AttachmentPreview({ url }: Props) {
  return (
    <div className="mt-4">
      <p className="text-xs font-medium text-slate-500">Attachment</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={url}
          alt="Ticket attachment"
          className="mt-2 max-h-64 rounded-lg border border-slate-200 object-contain"
        />
      </a>
    </div>
  );
}
