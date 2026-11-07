import { Download } from 'lucide-react';
import { useState } from 'react';

import type { PIAReportData } from './reportTypes';

export const DownloadPdfButton = ({ data }: { data: PIAReportData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    setHasError(false);
    try {
      const [{ pdf }, { PIAReportDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./PIAReportDocument'),
      ]);
      const blob = await pdf(<PIAReportDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `PIA-${data.projectName.replace(/[^\w-]+/g, '_')}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF generation failed', error);
      setHasError(true);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {hasError && <span className="text-sm text-error">PDF failed. Try again.</span>}
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-text-on-light-primary hover:bg-accent-hover disabled:opacity-50"
      >
        <Download className="h-4 w-4" />
        {isGenerating ? 'Generating…' : 'Download PDF'}
      </button>
    </div>
  );
};