import React from 'react';
import { Button } from 'react-bootstrap';
import { Download } from 'react-bootstrap-icons';

import './styles.css';

export default function DownloadButton({ data }: { data: string }) {
  const onClick = (e: any) => {
    e.stopPropagation();
    const downloadLink = document.createElement('a');
    // eslint-disable-next-line react/destructuring-assignment
    const [metadata] = data.split(';');
    const [, extension] = metadata.split('/');

    downloadLink.href = data;
    downloadLink.download = `attachment.${extension}`;
    downloadLink.click();
  };
  return (
    <Button onClick={onClick} variant="light" className="download-button">
      <Download />
    </Button>
  );
}
