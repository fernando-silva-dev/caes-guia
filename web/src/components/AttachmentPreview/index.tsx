import React, { useState } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './styles.css';
import { Download, XLg } from 'react-bootstrap-icons';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

// type PDFFile = string | File | null;

function downloadURI(uri: string, name: string) {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

interface AttachmentPreviewProps {
  attachmentUUID: string
  filename: string
  onClose: () => void
}

export default function AttachmentPreview({
  attachmentUUID,
  filename,
  onClose,
}: AttachmentPreviewProps) {
  const file = `http://localhost:5000/attachment/${attachmentUUID}`;
  const [numPages, setNumPages] = useState<number>();
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const isPDF = (n: string) => n?.endsWith('.pdf');
  const isImage = (n: string) => n?.endsWith('.png') || n?.endsWith('.jpg') || n?.endsWith('.jpeg') || n?.endsWith('.svg') || n?.endsWith('.gif');

  return (
    <Modal size="lg" show={show} onHide={handleClose} className="attachment_preview_modal">
      <div className="attachment_preview">
        <header>
          <div>
            <h1 className="d-inline-block p-3">{filename}</h1>
            <Button className="float-end m-2 border-0" variant="outline-light" onClick={handleClose}>
              <XLg />
            </Button>
            <Button className="float-end m-2" variant="outline-light" onClick={() => downloadURI(file, filename)}>
              <Download />
            </Button>
          </div>
        </header>
        <div className="attachment_preview_container">
          <div className="attachment_preview_container_document">
            {
              isPDF(filename) ? (
                <Document
                  file={file}
                  onLoadSuccess={(doc) => onDocumentLoadSuccess(doc)}
                  options={options}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              ) : null
            }
            {isImage(filename) ? <Image className="d-block mx-auto mb-4 mw-100" src={file} /> : null}
            {isPDF(filename) || isImage(filename) ? null : <h4 className="text-center w-100">Pré-vizualização não é possível</h4>}
          </div>
        </div>
      </div>
    </Modal>
  );
}
