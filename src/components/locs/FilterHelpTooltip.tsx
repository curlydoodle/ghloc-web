import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React, { ComponentProps, ReactNode } from "react";

type Props = {
	className?: string;
	tooltipClassName?: string;
};

const Code = ({ children }: { children: ReactNode }) => {
	return (
		<code className="px-1 py-0.5 text-code-normal-text bg-code-normal-bg rounded-md">
			{children}
		</code>
	);
};

export const FilterHelpTooltip = ({ className, tooltipClassName }: Props) => {
	return (
		<div className={classNames("relative group grid", className)}>
			<button
				className={classNames(
					"no-highlight relative w-5 h-5 transition-colors duration-75 text-muted focus:text-normal",
					"after:hidden group-focus-within:after:block group-hover:after:block after:h-[calc(100%+1.25rem)] after:absolute after:top-0 after:w-[200%] after:right-0"
				)}
				aria-label="Show filter syntax help"
			>
				<QuestionMarkCircleIcon />
			</button>

			<div
				className={classNames(
					"absolute z-10 top-2 mt-8 right-0 h-max w-96 max-w-[calc(100vw-1rem)] border border-normal shadow-lg rounded-lg origin-top-right bg-normal px-4 py-2 text-xs",
					"transition duration-75 ease-out scale-95 opacity-0 select-none",
					"group-focus-within:duration-100 group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:select-text",
					"group-hover:duration-100 group-hover:opacity-100 group-hover:scale-100 group-hover:select-text",
					"pointer-events-none group-focus-within:pointer-events-auto group-hover:pointer-events-auto",
					tooltipClassName
				)}
			>
				<h3 className="text-base mb-1">Filter syntax examples</h3>
				<ul className="leading-relaxed list-disc list-inside">
					<li>
						<Code>test,.sum</Code> will ignore paths containing{" "}
						<Code>test</Code> or <Code>.sum</Code>.
					</li>
					<li>
						<Code>_test.go$,^docs/</Code> will ignore paths ending
						with <Code>_test.go</Code> or starting with{" "}
						<Code>docs/</Code>.
					</li>
					<li>
						<Code>.md$,!^README.md$</Code> will ignore all Markdown
						files (i.e. ending with <Code>.md</Code>) except for{" "}
						<Code>README.md</Code> in the root of the repository.
					</li>
					<li>
						<Code>,!.go</Code> will only include paths containing{" "}
						<Code>.go</Code>.
					</li>
					<li>
						<Code>,!.go$</Code> will only include files with{" "}
						<Code>.go</Code> extension.
					</li>
					<li>
						<Code>,!^src/</Code> will filter all paths, except for
						the ones starting with <Code>src/</Code> (i.e. placed in
						the <Code>src</Code>
						folder).
					</li>
				</ul>
				<p className="mt-1">
					See{" "}
					<a
						className="text-link-normal hover:underline"
						href="https://github.com/subtle-byte/ghloc#readme"
						target="_blank"
						rel="noopener noreferrer"
					>
						ghloc
					</a>{" "}
					for details.
				</p>
			</div>
		</div>
	);
};
