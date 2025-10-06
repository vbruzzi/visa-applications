import { rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import Dice from "./icons/dice";
import Info from "./icons/info";

const iconComponents = {
  dice: Dice,
  info: Info,
} as const;

type IconName = keyof typeof iconComponents;

interface InfoDisplayProps {
  uischema: {
    type: string;
    options?: {
      icon?: IconName;
      text?: string;
      iconSize?: number;
      iconColor?: string;
      className?: string;
    };
  };
}

const InfoDisplayRenderer = ({ uischema }: InfoDisplayProps) => {
  const iconName = uischema.options?.icon;
  const text = uischema.options?.text;
  const iconSize = uischema.options?.iconSize || 32;
  const iconColor = uischema.options?.iconColor || "#1C274C";
  const className = uischema.options?.className || "";

  const IconComponent = iconName ? iconComponents[iconName] : null;

  return (
    <div className={`my-6 flex flex-col items-center text-center ${className}`}>
      {IconComponent && (
        <div className="mb-2">
          <IconComponent width={iconSize} height={iconSize} color={iconColor} />
        </div>
      )}
      {text && (
        <p className="text-gray-600 text-sm max-w-md">{text}</p>
      )}
    </div>
  );
};

export default withJsonFormsLayoutProps(InfoDisplayRenderer);

export const infoDisplayTester = rankWith(3, uiTypeIs("InfoDisplay"));
