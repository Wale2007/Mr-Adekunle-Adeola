// Global type declarations for third-party modules
declare module "@prisma/client" {
  export const PrismaClient: any;
}

declare module "lucide-react" {
  import * as React from "react";
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  export type Icon = React.FC<LucideProps>;
  export const Heart: Icon;
  export const Send: Icon;
  export const MessageCircle: Icon;
  export const Music: Icon;
  export const Cross: Icon;
  export const MapPin: Icon;
  export const Calendar: Icon;
  export const Clock: Icon;
  export const ExternalLink: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const Maximize2: Icon;
}
