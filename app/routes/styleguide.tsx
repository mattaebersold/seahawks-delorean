import Button from "~/components/global/Button";
import FormBlock from "~/components/blocks/FormBlock";
import SpacerBlock from "~/components/blocks/SpacerBlock";
import { BlockSpacing } from "~/types/blockTypes";

// ─── Helpers ────────────────────────────────────────────────────────────────

const BLOCK_BASE = {
  _key: "sg",
  blockSpacing: BlockSpacing.None,
  disabled: false,
  hideWhen: [],
} as const;

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-xl border-t border-black/10">
      <h2 className="mb-lg text-sm font-bold uppercase tracking-widest opacity-40">{title}</h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-md">{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mt-sm text-xs opacity-50 font-mono">{children}</p>;
}

// ─── Colors ──────────────────────────────────────────────────────────────────

const colors = [
  { name: "blue", hex: "#3B82F6" },
  { name: "dark-blue", hex: "#0B1433" },
  { name: "white", hex: "#f0f0f0" },
  { name: "blue-top", hex: "#5997FA" },
  { name: "blue-bottom", hex: "#C5DDFD" },
  { name: "blue-dark-top", hex: "#031643" },
  { name: "blue-dark-bottom", hex: "#1E4B90" },
  { name: "aurora-blue", hex: "#CDE3FF" },
  { name: "aurora-body", hex: "#06163B" },
  { name: "red", hex: "#EA5C5C" },
  { name: "teal", hex: "#017A8F" },
];

// ─── Styleguide ──────────────────────────────────────────────────────────────

export default function Styleguide() {
  return (
    <div className="max-w-wide mx-auto px-gutter py-xl">
      <h1 className="mb-xs">Styleguide</h1>
      <p className="opacity-50">Visual reference for all design tokens and components.</p>

      {/* ── Colors ── */}
      <Section title="Colors">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-md">
          {colors.map(({ name, hex }) => (
            <div key={name}>
              <div
                className="h-16 w-full rounded-lg border border-black/10"
                style={{ backgroundColor: hex }}
              />
              <Label>{name}</Label>
              <p className="text-xs opacity-40 font-mono">{hex}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography">
        <div className="space-y-sm">
          <div><h1>Heading 1</h1><Label>h1 · text-4xl</Label></div>
          <div><h2>Heading 2</h2><Label>h2 · text-3xl</Label></div>
          <div><h3>Heading 3</h3><Label>h3 · text-2xl</Label></div>
          <div><h4>Heading 4</h4><Label>h4 · text-xl</Label></div>
          <div>
            <p>Body paragraph. The quick brown fox jumps over the lazy dog.</p>
            <Label>p · base</Label>
          </div>
          <div>
            <ul><li>Unordered list item one</li><li>Unordered list item two</li></ul>
            <Label>ul · list-disc</Label>
          </div>
          <div>
            <ol><li>Ordered list item one</li><li>Ordered list item two</li></ol>
            <Label>ol · list-decimal</Label>
          </div>
        </div>
      </Section>

      {/* ── Buttons ── */}
      <Section title="Buttons">
        {(["primary", "secondary", "ghost"] as const).map((variant) => (
          <div key={variant} className="mb-lg">
            <Label>{variant}</Label>
            <Row>
              {(["sm", "md", "lg"] as const).map((size) => (
                <div key={size} className="flex flex-col items-start gap-xs">
                  <Button variant={variant} size={size}>
                    Button {size}
                  </Button>
                  <Label>size="{size}"</Label>
                </div>
              ))}
            </Row>
          </div>
        ))}
      </Section>

      {/* ── Spacing ── */}
      <Section title="Custom Spacing Tokens">
        <div className="space-y-sm">
          {[
            { name: "xs", value: "0.25rem / 4px", tw: "h-xs" },
            { name: "sm", value: "0.5rem / 8px", tw: "h-sm" },
            { name: "md", value: "1rem / 16px", tw: "h-md" },
            { name: "lg", value: "2rem / 32px", tw: "h-lg" },
            { name: "xl", value: "4rem / 64px", tw: "h-xl" },
            { name: "2xl", value: "8rem / 128px", tw: "h-2xl" },
            { name: "gutter", value: "1rem / 16px", tw: "h-gutter" },
            { name: "header", value: "50px", tw: "h-header" },
          ].map(({ name, value, tw }) => (
            <div key={name} className="flex items-center gap-md">
              <div className={`${tw} w-full max-w-xs bg-blue/20 rounded`} />
              <Label>{name} — {value}</Label>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Max Widths ── */}
      <Section title="Max Widths">
        <div className="space-y-md">
          {[
            { name: "max-w-narrow", value: "800px", cls: "max-w-narrow" },
            { name: "max-w-wide", value: "1200px", cls: "max-w-wide" },
          ].map(({ name, value, cls }) => (
            <div key={name}>
              <div className={`${cls} w-full h-8 bg-teal/20 rounded flex items-center px-sm`}>
                <span className="text-xs font-mono opacity-60">{name} · {value}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Border Radius ── */}
      <Section title="Border Radius">
        <Row>
          <div>
            <div className="w-24 h-24 bg-blue/20 rounded-card" />
            <Label>rounded-card · 24px</Label>
          </div>
          <div>
            <div className="w-24 h-24 bg-blue/20 rounded-lg" />
            <Label>rounded-lg · default</Label>
          </div>
          <div>
            <div className="w-24 h-24 bg-blue/20 rounded-full" />
            <Label>rounded-full</Label>
          </div>
        </Row>
      </Section>

      {/* ── Spacer Block ── */}
      <Section title="Block: SpacerBlock">
        {(["small", "medium", "large"] as const).map((size) => (
          <div key={size} className="border border-dashed border-black/20 rounded mb-md">
            <Label className="px-sm pt-sm">{size}</Label>
            <SpacerBlock {...BLOCK_BASE} _type="spacerBlock" size={size} />
          </div>
        ))}
      </Section>

      {/* ── Form Block ── */}
      <Section title="Block: FormBlock">
        <div className="border border-dashed border-black/20 rounded">
          <FormBlock
            {...BLOCK_BASE}
            _type="formBlock"
            formName="styleguide-contact"
            heading="Contact Us"
            submitText="Send Message"
            successMessage="Thanks! We'll be in touch."
            fields={[
              { _key: "f1", label: "Name", name: "name", type: "text", required: true, placeholder: "Your name" },
              { _key: "f2", label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
              { _key: "f3", label: "Subject", name: "subject", type: "select", required: false, options: ["General", "Support", "Sales"] },
              { _key: "f4", label: "Message", name: "message", type: "textarea", required: false, placeholder: "What's on your mind?" },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}
