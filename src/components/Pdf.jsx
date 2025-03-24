import React from 'react'
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { FaCloudDownloadAlt } from "react-icons/fa";
import format from 'date-fns/format';

const Pdf = () => {
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Name', 'Email', 'Country']],
      body: [
        ['John Doe', ' email protected', 'United States'],
        ['Jane Doe', ' email protected', 'Canada'],
        ['John Smith', ' email protected', 'Australia']
      ]
    });
    doc.save(`users-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  };

  return (
    <div >
      <div className='flex flex-col gap-4 justify-center items-center'>
        <p>Click here to download the PDF file.</p>
        <div >
          <button
            onClick={generatePdf}
            icon={<FaCloudDownloadAlt />}
            type='button'
            className='btn-primary'
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pdf