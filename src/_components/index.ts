import TextFieldRenderer, { textFieldTester } from "./text-field-renderer";
import EmailFieldRenderer, { emailFieldTester } from "./email-field-renderer";
import UrlFieldRenderer, { urlFieldTester } from "./url-field-renderer";
import TextAreaRenderer, { textAreaTester } from "./text-area-renderer";
import CheckboxGroupRenderer, {
  checkboxGroupTester,
} from "./checkbox-group-renderer";
import FileUploadRenderer, { fileUploadTester } from "./file-upload-renderer";
import VerticalLayoutRenderer, {
  verticalLayoutTester,
} from "./vertical-layout-renderer";

export const customRenderers = [
  { tester: verticalLayoutTester, renderer: VerticalLayoutRenderer },
  { tester: emailFieldTester, renderer: EmailFieldRenderer },
  { tester: urlFieldTester, renderer: UrlFieldRenderer },
  { tester: checkboxGroupTester, renderer: CheckboxGroupRenderer },
  { tester: fileUploadTester, renderer: FileUploadRenderer },
  { tester: textAreaTester, renderer: TextAreaRenderer },
  { tester: textFieldTester, renderer: TextFieldRenderer },
];
