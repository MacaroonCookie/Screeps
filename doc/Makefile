OUTPUTDIR=out

PDFLATEX_FLAGS=--output-dir=${OUTPUTDIR} --halt-on-error --file-line-error

all: main

main: screeps-logic.tex
	mkdir -p ${OUTPUTDIR}
	pdflatex ${PDFLATEX_FLAGS} screeps-logic.tex

clean:
	rm -rf ${OUTPUTDIR}

