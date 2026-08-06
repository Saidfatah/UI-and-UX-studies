//TODO: use spring forte transitions 


const curveHnadlesPositionDiffrence = 12.5

const makeCurveToSubLine = (startingPoint: { x: number, y: number }, targetPoint: { x: number, y: number }) => {
    return `C 
    ${startingPoint.x} ${targetPoint.y - curveHnadlesPositionDiffrence},  
    ${targetPoint.x} ${startingPoint.y + curveHnadlesPositionDiffrence},  
    ${targetPoint.x} ${targetPoint.y},  
    `
}

const makeCurveToParentLine = (startingPoint: { x: number, y: number }, targetPoint: { x: number, y: number }) => {
    return `C 
    ${startingPoint.x} ${targetPoint.y - curveHnadlesPositionDiffrence}, 
    ${targetPoint.x} ${startingPoint.y + curveHnadlesPositionDiffrence}, 
    ${targetPoint.x} ${targetPoint.y},
    `
}

interface Node {
    label: string;
    subLinks: { label: string }[];
}

const nodes: Node[] = [
    {
        label: "Today",
        subLinks: [
            // {
            //     label: "Asked for a heigh-protien meal plan"
            // },
            {
                label: "Worked on b402 dhasboard UX"
            },
            {
                label: "Brainstormed side projects"
            },
        ]
    },
    {
        label: "Yesterday",
        subLinks: [
            {
                label: "Researched ETF investing strategies"
            },
            {
                label: "Drafted a polite client email"
            },
            {
                label: "Asked about improving sleeping quality"
            },
            {
                label: "Generated taglien ideas for landing page"
            },
        ]
    },
    {
        label: "March 1, 2026",
        subLinks: [
            {
                label: "Studied sucrity attacks"
            },
            {
                label: "Studied scurtiy defenses"
            },
            {
                label: "Went for a bike ride"
            },
            {
                label: "Read a book about productivity"
            },
        ]
    },

]


const xStepSize = 25
const yStepSize = 25 // if changed , change linksFlexGap as well
const linksFlexGap = 25 - 16

const pathStrokeWidth = 2

const xOffset = 3;
const yOffset = 3;

const subLineDepth = xOffset + xStepSize
const nodesToTalHeight = nodes.reduce((a, c) => a + yStepSize + c.subLinks.length * yStepSize, 0)

 
const generatePath = ({ canvasH }: { canvasH: number }) => {
    let path = `M ${xOffset} ${yOffset},`


    let lastSubLinePoint = { x: 0, y: yOffset }
    let lastMainLineMergingPoint = { x: 0, y: 0 }


    let debuggingPoints: { x: number; y: number; type: string }[] = []
    debuggingPoints.push({ x: xOffset, y: yOffset, type: "move" })

    for (let i = 0; i < nodes.length; i++) {
        const currentParentNode = nodes[i]

        console.log("i", i)
        let parentLinePoint = {
            x: xOffset,
            y: yOffset
        }

        if (i == 0) {
            parentLinePoint.y += yStepSize
        } else {
            // start from the last point in the sub line
            parentLinePoint.y = lastMainLineMergingPoint.y

            // here we need to create two points 
            // one for the subline to attach to 
            // one for the parent line to continue from
            parentLinePoint.y += yStepSize 
        }

        path += ` L ${parentLinePoint.x} ${parentLinePoint.y},`
        debuggingPoints.push({ ...parentLinePoint, type: "parent" })

        if (currentParentNode.subLinks?.length > 0) {
            const subLineStartingPoint = {
                x: subLineDepth,
                y: parentLinePoint.y + yStepSize
            }

            debuggingPoints.push({ ...subLineStartingPoint, type: "sub-start" })

            const curveToSubLine = makeCurveToSubLine(
                parentLinePoint,
                subLineStartingPoint
            )

            path += " " + curveToSubLine

            for (let j = 0; j < currentParentNode.subLinks.length; j++) {
                lastSubLinePoint = {
                    x: subLineDepth,
                    y: subLineStartingPoint.y + (j + 1) * yStepSize
                }

                path += ` L ${lastSubLinePoint.x} ${lastSubLinePoint.y},`

                debuggingPoints.push({ ...lastSubLinePoint, type: "sub" })
            }

            lastMainLineMergingPoint = {
                x: xOffset,
                y: lastSubLinePoint.y + yStepSize
            }


            debuggingPoints.push({ ...lastMainLineMergingPoint, type: "return" })

            const curveToParentLine = makeCurveToParentLine(
                lastSubLinePoint,
                lastMainLineMergingPoint
            )

            path += " " + curveToParentLine
        }
    }

    const bottomLine = `L ${xOffset} ${canvasH + 200}`
    path += bottomLine

    return { path, debuggingPoints }
}


function TimeLineNode({ label, subLinks }: {
    label: string;
    subLinks?: { label: string }[];
}) {

    return <li
        className="flex flex-col "
        style={{
            gap: `${linksFlexGap}px`
        }}
        key={label}
    >
        <span className="  inline-block text-[16px] leading-[100%]  h-[16px]   ">{label}</span>

        {subLinks && (
            <ul
                style={{
                    gap: `${linksFlexGap}px`,
                    marginLeft: `${xStepSize}px`
                }}
                className="list-none flex flex-col"
            >
                {subLinks.map((subLink, index) => (
                    <TimeLineNode key={index} label={subLink.label} />
                ))}
            </ul>
        )}

    </li>
}


const { path, debuggingPoints } = generatePath({ canvasH: nodesToTalHeight })

const debuggingPointColorMap: Record<string, string> = {
    parent: "red",
    sub: "blue",
    "sub-start": "green",
    return: "green",
}

function TimlienMap() {


    return (<div className="h-screen w-screen flex items-center justify-center">
        <div
            className=" relative w-fit"
            style={{
                paddingLeft: `${xStepSize + pathStrokeWidth}px`
            }}
        >
            <ul
                className=" list-none flex flex-col"
                style={{
                    gap: `${linksFlexGap}px`,
                }}
            >
                {nodes.map((node, index) => (<TimeLineNode key={index} label={node.label} subLinks={node.subLinks} />))}
            </ul>

            <svg
                className="absolute top-0 left-0"
                width={`${xStepSize + pathStrokeWidth + 4}px`}
                height={`${nodesToTalHeight + 200}px`}
            >
                <path
                    d={path}
                    stroke="gray"
                    fill="none"
                    strokeWidth={pathStrokeWidth}
                />

                {debuggingPoints.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={2}
                        fill={debuggingPointColorMap[p.type]}
                    />
                ))}
            </svg>
        </div>



    </div>);
}

export default TimlienMap;