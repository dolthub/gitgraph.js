import {
  Branch,
  Coordinate,
  GitgraphCore,
  toSvgPath,
} from "@dolthub/gitgraph-core";
import * as React from "react";
import { ReactElement } from "react";
import { ReactSvgElement } from "./types";

interface BranchPathProps {
  branch: Branch<ReactElement<SVGElement>>;
  coordinates: Coordinate[][];
  isBezier: boolean;
  offset: number;
  gitgraph: GitgraphCore<ReactSvgElement>;
  getWithCommitOffset: (props: any) => Coordinate;
}

export class BranchPath extends React.Component<BranchPathProps, any> {
  public render() {
    return (
      <>
        <defs>
          <filter
            id={`branch-path-shadow-${this.props.branch.name}`}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood
              floodColor={this.props.branch.computedColor}
              floodOpacity="0"
              result="BackgroundImageFix"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values={hexToColorMatrixVariant(this.props.branch.computedColor)}
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2_590"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2_590"
              result="shape"
            />
          </filter>
        </defs>
        <g>
          <path
            d={toSvgPath(
              this.props.coordinates.map((a) =>
                a.map((b) => this.props.getWithCommitOffset(b)),
              ),
              this.props.isBezier,
              this.props.gitgraph.isVertical,
            )}
            fill="none"
            stroke={this.props.branch.computedColor}
            strokeWidth={this.props.branch.style.lineWidth}
            transform={`translate(${this.props.offset}, ${this.props.offset})`}
            filter={`url(#branch-path-shadow-${this.props.branch.name})`}
          />
        </g>
      </>
    );
  }
}

function hexToColorMatrixVariant(hex?: string): string {
  if (!hex) {
    return "";
  }
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;
  return `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 0.5 0`;
}
