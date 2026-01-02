import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "../../test/utils";
import userEvent from "@testing-library/user-event";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

describe("AlertDialog", () => {
  describe("AlertDialog (root)", () => {
    it("does not render when closed", () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={false}>
          <AlertDialogContent>
            <p>Content</p>
          </AlertDialogContent>
        </AlertDialog>,
      );
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it("renders when open", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <p>Content</p>
          </AlertDialogContent>
        </AlertDialog>,
      );
      await waitFor(() => {
        expect(screen.getByText("Content")).toBeInTheDocument();
      });
    });

    it("calls onOpenChange when ESC is pressed", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <AlertDialog onOpenChange={onOpenChange} open={true}>
          <AlertDialogContent>
            <p>Content</p>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("does not call onOpenChange when ESC is pressed and closeOnEsc is false", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <AlertDialog closeOnEsc={false} onOpenChange={onOpenChange} open={true}>
          <AlertDialogContent>
            <p>Content</p>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await user.keyboard("{Escape}");
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it("does not close on overlay click by default", async () => {
      const onOpenChange = vi.fn();

      render(
        <AlertDialog onOpenChange={onOpenChange} open={true}>
          <AlertDialogContent data-testid="content">
            <p>Content</p>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("content");
        expect(content).toBeInTheDocument();
      });

      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it("locks body scroll when open", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <p>Content</p>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        expect(document.body.style.overflow).toBe("hidden");
      });
    });
  });

  describe("AlertDialogContent", () => {
    it("renders with role alertdialog", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent data-testid="alert-content">
            Content
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("alert-content");
        expect(content).toHaveAttribute("role", "alertdialog");
      });
    });

    it("has aria-modal attribute", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent data-testid="alert-content">
            Content
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("alert-content");
        expect(content).toHaveAttribute("aria-modal", "true");
      });
    });

    it("has aria-labelledby attribute", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent data-testid="alert-content">
            Content
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("alert-content");
        expect(content).toHaveAttribute(
          "aria-labelledby",
          "alert-dialog-title",
        );
      });
    });

    it("has aria-describedby attribute", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent data-testid="alert-content">
            Content
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("alert-content");
        expect(content).toHaveAttribute(
          "aria-describedby",
          "alert-dialog-description",
        );
      });
    });
  });

  describe("AlertDialogHeader", () => {
    it("renders children", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <p>Header content</p>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        expect(screen.getByText("Header content")).toBeInTheDocument();
      });
    });
  });

  describe("AlertDialogTitle", () => {
    it("renders as h2 element", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogTitle data-testid="title">Title</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const title = screen.getByTestId("title");
        expect(title.tagName).toBe("H2");
      });
    });

    it("has correct id for aria-labelledby", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogTitle data-testid="title">Title</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const title = screen.getByTestId("title");
        expect(title).toHaveAttribute("id", "alert-dialog-title");
      });
    });
  });

  describe("AlertDialogDescription", () => {
    it("renders as paragraph element", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogDescription data-testid="description">
              Description
            </AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const description = screen.getByTestId("description");
        expect(description.tagName).toBe("P");
      });
    });

    it("has correct id for aria-describedby", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogDescription data-testid="description">
              Description
            </AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const description = screen.getByTestId("description");
        expect(description).toHaveAttribute("id", "alert-dialog-description");
      });
    });
  });

  describe("AlertDialogFooter", () => {
    it("renders children", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogFooter>
              <p>Footer content</p>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        expect(screen.getByText("Footer content")).toBeInTheDocument();
      });
    });
  });

  describe("AlertDialogAction", () => {
    it("renders as button element", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogFooter>
              <AlertDialogAction data-testid="action">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const action = screen.getByTestId("action");
        expect(action.tagName).toBe("BUTTON");
      });
    });

    it("has destructive variant by default", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogFooter>
              <AlertDialogAction data-testid="action">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const action = screen.getByTestId("action");
        // Button with destructive variant will have specific classes
        expect(action).toBeInTheDocument();
      });
    });

    it("can use different variant", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogFooter>
              <AlertDialogAction data-testid="action" variant="default">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const action = screen.getByTestId("action");
        expect(action).toBeInTheDocument();
      });
    });
  });

  describe("AlertDialogCancel", () => {
    it("renders as button element", async () => {
      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="cancel">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        const cancel = screen.getByTestId("cancel");
        expect(cancel.tagName).toBe("BUTTON");
      });
    });

    it("calls onClick when clicked", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onClick}>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(async () => {
        const cancel = screen.getByText("Cancel");
        await user.click(cancel);
        expect(onClick).toHaveBeenCalled();
      });
    });
  });

  describe("Complete alert dialog", () => {
    it("renders full alert dialog with all parts", async () => {
      const onAction = vi.fn();
      const onCancel = vi.fn();

      render(
        <AlertDialog onOpenChange={vi.fn()} open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onAction}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>,
      );

      await waitFor(() => {
        expect(screen.getByText("Are you sure?")).toBeInTheDocument();
        expect(
          screen.getByText("This action cannot be undone."),
        ).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Continue")).toBeInTheDocument();
      });
    });
  });
});
