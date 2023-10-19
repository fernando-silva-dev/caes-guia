import React, { useState } from 'react';
import { Button, Container, Image, Modal } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './styles.css';
import { Download, Plus, XLg } from 'react-bootstrap-icons';
import Logo from '~/assets/helen-keller-logo.png';

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
  type: string
}

export default function AttachmentPreview({
  attachmentUUID,
  filename,
  type,
}: AttachmentPreviewProps) {
  const file = `http://localhost:5164/attachment/${attachmentUUID}`;
  const [numPages, setNumPages] = useState<number>();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
  //   const { files } = event.target;
  //
  //   if (files && files[0]) {
  //     setFile(files[0] || null);
  //   }
  // }

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <Modal size="lg" show={show} onHide={handleClose} className="attachment_preview_modal">
      <div className="attachment_preview">
        <header>
          <div>
            <h1 className="d-inline-block p-3">{filename}</h1>
            <Button className="float-end m-2 border-0" variant="outline-light" onClick={() => setShow(false)}>
              <XLg />
            </Button>
            <Button className="float-end m-2" variant="outline-light" onClick={() => downloadURI(file, filename)}>
              <Download />
            </Button>
          </div>
        </header>
        <div className="attachment_preview_container">
          <div className="attachment_preview_container_document">
            {type?.includes('pdf')
              ? (
                <Document
                  file={file}
                  onLoadSuccess={(doc) => onDocumentLoadSuccess(doc)}
                  options={options}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              )
              : <Image className="d-block mx-auto mb-4" src={file} />}
          </div>
        </div>
      </div>
    </Modal>
  );
}
