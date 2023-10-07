"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
// PDF actions
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import packageJson from "../../package.json";

const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

type Props = {
  pdf_url: string;
};

const PDFViewer = ({ pdf_url }: Props) => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
    >
      <div style={{ height: "750px" }}>
        <Viewer
          fileUrl={pdf_url}
          // plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
};

export default PDFViewer;
