import {
  LayoutProps,
  rankWith,
  uiTypeIs,
  UISchemaElement,
  Layout,
} from "@jsonforms/core";
import {
  ResolvedJsonFormsDispatch,
  withJsonFormsLayoutProps,
} from "@jsonforms/react";

const VerticalLayoutRenderer = ({
  uischema,
  schema,
  path,
  enabled,
  renderers,
  cells,
}: LayoutProps) => {
  const layout = uischema as Layout;
  const childElements = layout.elements || [];

  return (
    <div className="space-y-0">
      {childElements.map((child: UISchemaElement, index: number) => (
        <ResolvedJsonFormsDispatch
          key={`${path}-${index}`}
          uischema={child}
          schema={schema}
          path={path}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      ))}
    </div>
  );
};

export default withJsonFormsLayoutProps(VerticalLayoutRenderer);

export const verticalLayoutTester = rankWith(2, uiTypeIs("VerticalLayout"));
