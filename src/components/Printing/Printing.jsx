import React, { forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
const Printing = forwardRef(({ trigg, untrigg, documentTitle = "impresión" }, ref) => {
    // const componentRef = React.useRef(areaPrint);
    console.log(ref.current);
    
        const handlePrint = useReactToPrint({
            content: () => ref.current,
            documentTitle: documentTitle,
            //onAfterPrint:()=>alert('')
            onAfterPrint: () => {
                // Reset the Promise resolve so we can print again
                trigg.current = false;
                untrigg(false);
              },
        });
        React.useEffect(() => {
            if(trigg.current==true){
                handlePrint();
            }
        }, []);
        
    
    return (
        <>
            {/* 
            
            <button onClick={handlePrint}>
                <PrintIcon></PrintIcon>
            </button> 
          
            */}
        </>
    )
})

export default Printing