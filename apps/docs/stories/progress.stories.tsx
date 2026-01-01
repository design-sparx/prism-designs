/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Storybook demo code uses setState callbacks which TypeScript marks as 'any' */
/* eslint-disable @typescript-eslint/no-unsafe-call -- Storybook demo code uses setState callbacks which TypeScript marks as 'any' */
/* eslint-disable @typescript-eslint/no-unsafe-return -- Storybook demo code with callbacks */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- Storybook demo code with state values */
/* eslint-disable react/button-has-type -- Demo buttons don't need explicit types */
import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Progress } from "@prism/react/progress";

/**
 * Progress Component Stories
 *
 * Showcases the Prism Progress component in various states.
 * Progress bars display task completion status visually.
 */

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value (0-100)",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

/**
 * Default Progress
 *
 * Progress bar at 50%
 */
export const Default: Story = {
  args: {
    value: 50,
    className: "w-[400px]",
  },
};

/**
 * Empty
 *
 * Progress bar at 0% (not started)
 */
export const Empty: Story = {
  args: {
    value: 0,
    className: "w-[400px]",
  },
};

/**
 * Quarter Complete
 *
 * Progress bar at 25%
 */
export const QuarterComplete: Story = {
  args: {
    value: 25,
    className: "w-[400px]",
  },
};

/**
 * Half Complete
 *
 * Progress bar at 50%
 */
export const HalfComplete: Story = {
  args: {
    value: 50,
    className: "w-[400px]",
  },
};

/**
 * Three Quarters Complete
 *
 * Progress bar at 75%
 */
export const ThreeQuartersComplete: Story = {
  args: {
    value: 75,
    className: "w-[400px]",
  },
};

/**
 * Complete
 *
 * Progress bar at 100% (finished)
 */
export const Complete: Story = {
  args: {
    value: 100,
    className: "w-[400px]",
  },
};

/**
 * Indeterminate
 *
 * Progress bar with no value (indeterminate state)
 */
export const Indeterminate: Story = {
  args: {
    className: "w-[400px]",
  },
};

/**
 * Animated Progress
 *
 * Demonstrates animated progress from 0 to 100
 */
export const AnimatedProgress: Story = {
  render: function AnimatedProgressRender() {
    const [progress, setProgress] = useState(13);

    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => {
        clearTimeout(timer);
      };
    }, []);

    return (
      <div style={{ width: "400px" }}>
        <Progress value={progress} />
        <div
          style={{
            marginTop: "0.5rem",
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          {progress}%
        </div>
      </div>
    );
  },
};

/**
 * File Upload Example
 *
 * Real-world example: file upload progress
 */
export const FileUpload: Story = {
  render: function FileUploadRender() {
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
      <div style={{ width: "500px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Uploading document.pdf
          </span>
          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            {uploadProgress}%
          </span>
        </div>
        <Progress aria-label="File upload progress" value={uploadProgress} />
        {uploadProgress === 100 && (
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              color: "#10b981",
            }}
          >
            ✓ Upload complete
          </div>
        )}
      </div>
    );
  },
};

/**
 * Multiple Progress Bars
 *
 * Showing progress of multiple tasks
 */
export const MultipleTasks: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.875rem" }}>Task 1: Processing</span>
          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>100%</span>
        </div>
        <Progress value={100} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.875rem" }}>Task 2: Uploading</span>
          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>75%</span>
        </div>
        <Progress value={75} />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.875rem" }}>Task 3: Analyzing</span>
          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>30%</span>
        </div>
        <Progress value={30} />
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.875rem" }}>Task 4: Pending</span>
          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>0%</span>
        </div>
        <Progress value={0} />
      </div>
    </div>
  ),
};

/**
 * Different Widths
 *
 * Progress bars at various widths
 */
export const DifferentWidths: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          Small (200px)
        </div>
        <Progress className="w-[200px]" value={50} />
      </div>
      <div>
        <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          Medium (400px)
        </div>
        <Progress className="w-[400px]" value={50} />
      </div>
      <div>
        <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          Large (600px)
        </div>
        <Progress className="w-[600px]" value={50} />
      </div>
    </div>
  ),
};

/**
 * Form Completion
 *
 * Real-world example: multi-step form progress
 */
export const FormCompletion: Story = {
  render: function FormCompletionRender() {
    const totalSteps = 5;
    const [currentStep, setCurrentStep] = useState(2);
    const progress = (currentStep / totalSteps) * 100;

    return (
      <div style={{ width: "500px" }}>
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
              Complete your profile
            </span>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress aria-label="Form completion progress" value={progress} />
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "1.5rem",
          }}
        >
          <button
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              cursor: currentStep === 1 ? "not-allowed" : "pointer",
              opacity: currentStep === 1 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <button
            disabled={currentStep === totalSteps}
            onClick={() =>
              setCurrentStep(Math.min(totalSteps, currentStep + 1))
            }
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              backgroundColor:
                currentStep === totalSteps ? "#10b981" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: currentStep === totalSteps ? "not-allowed" : "pointer",
              opacity: currentStep === totalSteps ? 0.5 : 1,
            }}
          >
            {currentStep === totalSteps ? "Completed" : "Next"}
          </button>
        </div>
      </div>
    );
  },
};

/**
 * Installation Progress
 *
 * Real-world example: software installation
 */
export const InstallationProgress: Story = {
  render: function InstallationProgressRender() {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Preparing...");

    useEffect(() => {
      const stages = [
        { progress: 20, status: "Downloading..." },
        { progress: 50, status: "Extracting files..." },
        { progress: 80, status: "Installing..." },
        { progress: 100, status: "Complete!" },
      ];

      let currentStage = 0;

      const interval = setInterval(() => {
        if (currentStage < stages.length) {
          setProgress(stages[currentStage].progress);
          setStatus(stages[currentStage].status);
          currentStage++;
        } else {
          clearInterval(interval);
        }
      }, 1500);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
      <div style={{ width: "450px" }}>
        <div
          style={{
            marginBottom: "1rem",
            fontSize: "1.125rem",
            fontWeight: 600,
          }}
        >
          Installing Application
        </div>
        <Progress aria-label="Installation progress" value={progress} />
        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          <span>{status}</span>
          <span>{progress}%</span>
        </div>
      </div>
    );
  },
};
