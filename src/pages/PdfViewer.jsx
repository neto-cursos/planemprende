// import { useState } from "react";
// import { Document, Page } from "react-pdf/dist/esm/entry.vite";
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';

// const options = {
//   cMapUrl: 'cmaps/',
//   cMapPacked: true,
//   standardFontDataUrl: 'standard_fonts/',
// };
// const PdfViewer = () => {
//   const [file, setFile] = useState('document.pdf');
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const goToPrevPage = () =>
//     setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

//   const goToNextPage = () =>
//     setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

//   return (
//     <div className="page flex flex-col justify-center items-center mx-0 my-auto">
//       <nav className="flex mx-4 my-auto items-center justify-between">
//         <button onClick={goToPrevPage} className="bg-[#f1f1f1] text-black border-none text-black p-4 m-3 cursor-pointer rounded-sm">
//           Anterior
//         </button>
//         <button onClick={goToNextPage} className="bg-[#4a8fed] text-black border-none text-black p-4 m-3 cursor-pointer rounded-sm">
//           Siguiente
//         </button>
//         <p className="text-sm bg-[#f5f5f5] p-4">
//           Página {pageNumber} de {numPages}
//         </p>
//       </nav>

//       <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options} className="mx-4 my-0 flex flex-col items-center">
//         {/* {Array.from(new Array(numPages), (el, index) => (
//           <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//         ))} */}
//         <Page pageNumber={pageNumber} className="m-4 shadow-sm w-64"/>
//       </Document>

//       {/* <Document file="document.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document> */}
//     </div>
//   );
// };

// export default PdfViewer;