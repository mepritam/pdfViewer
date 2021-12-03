import React, { useEffect, useState } from 'react';
import { Container, Heading, Divider, Button, Stack, Text } from '@chakra-ui/react'
import PDFViewer from "pdf-viewer-reactjs";
import axios from 'axios';

function PdfViewer() {
    let [currentPage, setPage] = useState(1);
    let [scale, setScale] = useState(1);
    let [pages, setPages] = useState(1);
    let [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        axios.get('https://h1u65.sse.codesandbox.io').then((res) => {
            setPdfData(res.data.data);
        })
    }, [])

    const onClickHandler = (task) => {
        if(task === 'prev') {
            if(currentPage > 1) {
                setPage(currentPage-1)
            }
        }
        else {
            if(pages > currentPage) {
                setPage(currentPage+1)
            }
        } 
    }

    const scaleHandler = (task) => {
        if(task === 'in') {
            if(scale < 2){
                setScale(scale+0.5)
            }
        }
        if(task === 'out'){
            if(scale > 1) {
                setScale(scale-0.5)
            }
        }
    }

    const doc = React.useMemo(() => ({ base64: pdfData}), [pdfData]);

    return(
        <Container maxW="container.lg" marginTop={5} centerContent border="1px solid black">
            <Heading> PDF Render Demo Via Node JS </Heading>
            {pdfData !== null ? (
                <React.Fragment>
                    <Divider marginTop={5} />
                    <Stack direction="row" spacing="4" align="center" marginTop="2">
                        <Button colorScheme="teal" onClick={() => {scaleHandler('in')}} > Zoom In </Button>
                        <Button colorScheme="teal" onClick={() => {scaleHandler('out')}} > Zoom Out </Button>
                        <Button colorScheme="green" onClick={() => {onClickHandler('prev')}} > Prev </Button>
                        <Button colorScheme="green" onClick={() => {onClickHandler('next')}} > Next </Button>
                    </Stack>
                    <PDFViewer
                        document={doc}
                        canvasCss='customCanvasCss'
                        hideNavbar
                        scale={scale}
                        externalInput
                        page={currentPage}
                        minScale={1}
                        maxScale={2}
                        getMaxPageCount={(count) => setPages(count)}
                    />
                </React.Fragment>
            ):(
                <Text> REST API Call In Process ...</Text>
            )}
        </Container>
    )
}

export {PdfViewer}